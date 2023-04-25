set -ev

# ENV
TAG_NAME=`git log --pretty='%s' -1`
NEXUS_HOST="https://nexus.internal.live-helps.com"
GROUP_ID="com.easemob.kefu.webim.product"
ARTIFACT_ID="kefu-webim"
VERSION=${TAG_NAME}
# or use gitlab runner env
# VERSION=${CI_COMMIT_TAG}

# Ensure package version from git tag
echo git tag: $VERSION

pwd

# Compress package
cd ../
ls
zip -q -r kefu-webim-${VERSION}.zip kefu-webim -x "kefu-webim/node_modules/*" -x kefu-webim/appPageCached.js

# Upload package to 
curl -v -u 'upload:YzYf2023@123' "${NEXUS_HOST}/service/rest/v1/components?repository=releases" \
  -F "maven2.generate-pom=false" \
  -F "maven2.groupId=${GROUP_ID}" \
  -F "maven2.artifactId=${ARTIFACT_ID}" \
  -F "maven2.version=${VERSION}" \
  -F "maven2.asset1.extension=zip" \
  -F "maven2.asset1=@${CI_PROJECT_DIR}/../kefu-webim-${VERSION}.zip" 