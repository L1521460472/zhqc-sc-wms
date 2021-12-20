##
#前端工程自动化构建
#dev环境
##

node_path=/usr/local/bin/node
npm_path=/usr/local/bin/cnpm
develop_path=/opt/zhqc-cloud-dev/scwl
product=zhqc-scwl-vue-dev #不能重复
tar_path=tmp/$product
target_path=./dist

function display(){
 if [ $? -ne 0 ] #最后一次执行命令"的退出状态.0为成功,非0为失败
 then
   exit -999
 fi
}

echo "清除原先的dist打包文件夹"
if [ -d $target_path ]
then
 rm -rf $target_path
fi
display

echo "安装依赖"
node_depency="${npm_path} i"
$node_depency
display

echo "开始打包"
build="${npm_path} run build"
$build
display

if [ ! -d $target_path ]
then
  echo "打包失败,dist未生成"
  exit 1
fi
echo "======================================"
echo "创建打包目录${tar_path}"
if [ ! -d $tar_path ]
then
 mkdir -p $tar_path
fi
display
echo "创建升级文件压缩包$tar_path/${product}.tar.gz"
tar  -cf $tar_path/${product}.tar.gz -C ${target_path} .
display
echo "创建升级文件压缩包成功"
echo "======================================"
echo "备份${develop_path}/page下文件到${develop_path}/bak/page"
pg="page-`date +%Y%m%d`-`date +%H%M%S`"
tar -cf ${develop_path}/bak/page/$pg.tar.gz -C ${develop_path}/page .
echo "备份成功，文件名：${pg}.tar.gz"
echo "======================================"
echo "复制升级文件到目录${develop_path}/update/page"
cp $tar_path/${product}.tar.gz ${develop_path}/update/page
echo "复制完成"
echo "======================================"
echo "开始升级"
echo "删除${develop_path}/page下文件"
rm -rf ${develop_path}/page/*
echo "删除成功"
echo "解压升级文件到${develop_path}/page"
tar -xf ${develop_path}/update/page/${product}.tar.gz -C ${develop_path}/page
display
echo "升级完成"
echo "======================================"
echo "清除原始压缩包$tar_path/${product}.tar.gz"
rm -rf $tar_path/${product}.tar.gz
display
echo "清除原始压缩包成功"
exit 0
