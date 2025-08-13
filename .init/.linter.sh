#!/bin/bash
cd /home/kavia/workspace/code-generation/elegant-task-organizer-157488/todo_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

