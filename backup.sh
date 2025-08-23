#!/bin/bash

BACKUP_DIR="$HOME/backups"
mkdir -p "$BACKUP_DIR"

choice=$(osascript -e 'choose from list {"새 백업 생성","기존 백업 복원"} with prompt "rsync 백업 유틸리티"')
if [ "$choice" == "false" ]; then
    echo "취소됨"
    exit 1
fi

if [ "$choice" == "새 백업 생성" ]; then
    backup_id=$(osascript -e 'text returned of (display dialog "Backup ID 입력:" default answer "")')
    if [ -z "$backup_id" ]; then
        osascript -e 'display alert "⚠️ Backup ID는 비어있을 수 없습니다."'
        exit 1
    fi
    dest="$BACKUP_DIR/$backup_id"
    mkdir -p "$dest"
    rsync -avh --progress ./ "$dest"
    osascript -e 'display notification "백업 완료!" with title "rsync 백업"'
    open "$dest"

else
    list=$(ls "$BACKUP_DIR")
    backup_id=$(osascript -e "choose from list {$(printf '"%s",' $list | sed 's/,$//')} with prompt \"복원할 Backup ID 선택:\"")
    if [ "$backup_id" == "false" ]; then
        exit 1
    fi
    src="$BACKUP_DIR/$backup_id"
    rsync -avh --progress --delete --force "$src/" ./
    osascript -e 'display notification "복원 완료!" with title "rsync 복원"'
fi
