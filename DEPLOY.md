# Vercel 部署说明

## 🎯 已修复的问题

1. ✅ Service Worker 路径从绝对路径改为相对路径
2. ✅ 缓存路径从 `/` 改为 `./`
3. ✅ 创建了 `vercel.json` 配置文件
4. ✅ 添加了 `.vercelignore` 忽略不需要的文件

## 📝 重新部署步骤

### 方法 1: 使用 Vercel CLI（推荐）

1. 安装 Vercel CLI（如果还没安装）：
```bash
npm i -g vercel
```

2. 在项目根目录运行：
```bash
vercel --prod
```

### 方法 2: 使用 Git 推送

1. 提交所有更改：
```bash
git add .
git commit -m "Fix Vercel deployment paths"
git push
```

2. Vercel 会自动重新部署

### 方法 3: 从 Vercel 仪表板

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 找到你的项目
3. 点击 "Redeploy" 按钮
4. 选择 "Redeploy with existing Build Cache cleared"

## ⚠️ 部署后注意事项

### 清除旧的 Service Worker 缓存

由于修改了 Service Worker，用户需要清除缓存才能看到新版本：

1. 打开浏览器开发者工具（F12）
2. 进入 "Application" 或 "应用" 标签
3. 点击左侧 "Service Workers"
4. 点击 "Unregister" 注销旧的 Service Worker
5. 刷新页面（Ctrl + Shift + R）

### 验证部署是否成功

1. 打开浏览器控制台（F12）
2. 查看是否有以下成功消息：
   - `✅ Service Worker 注册成功`
   - 没有 404 错误
   - CSS 样式正常加载

## 🔍 常见问题排查

### 问题：页面样式还是不对

**解决方案：**
- 强制刷新：Ctrl + Shift + R
- 清除浏览器缓存
- 使用无痕模式测试

### 问题：音乐不播放

**解决方案：**
- 检查 `birthday.mp3` 文件是否已上传到 Vercel
- 浏览器可能阻止自动播放，需要用户交互

### 问题：图片不显示

**解决方案：**
- 确保 `images/` 文件夹中的所有图片都已上传
- 检查图片文件名是否正确（区分大小写）

## 📱 PWA 安装测试

部署成功后，你可以：
1. 在 Chrome 浏览器地址栏右侧看到"安装"图标
2. 点击安装后，应用会添加到桌面
3. 可以像原生应用一样使用

## 🎉 完成

如果一切正常，你应该能看到：
- 🔒 密码保护页面
- 🎂 精美的生日祝福动画
- 📸 照片墙
- 🎵 背景音乐
- 🎆 烟花效果

---

**提示：** 如果还有问题，请检查 Vercel 的部署日志，查看是否有错误信息。

