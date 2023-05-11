# travis
CUR_COMMIT_MSG=`git log --pretty='%s' -1`
TAG_NAME=$CUR_COMMIT_MSG npm run build_all
