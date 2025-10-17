const { createApp } = Vue;

createApp({
    data() {
        return {
            showCover: true,
            showFireworksPage: false,
            showMainContent: false,
            confettiExploded: false,
            musicPlaying: false,
            candlesBlown: false,
            candles: 26, // 蜡烛数量，可以改成女朋友的年龄
            fireworksAnimationId: null, // 烟花动画ID

            // 在一起的时间（请修改这个日期为你们在一起的日期）
            startDate: new Date('2018-01-07'),  // ⬅️ 修改这里！
            timeTogether: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            },

            // 回忆照片
            memories: [
                { image: 'images/photo1.jpg', caption: '数字情诗社' },
                { image: 'images/photo2.jpg', caption: '一起恶搞' },
                { image: 'images/photo3.jpg', caption: '第一次拍证件照' },
                { image: 'images/photo4.jpg', caption: '第一次合影' },
                { image: 'images/photo5.jpg', caption: '第一次为我试衣' },
                { image: 'images/photo6.jpg', caption: '第一次看电影' }
            ],

            // 爱你的理由
            reasons: [
                '你的笑容能照亮我的整个世界',
                '你总是那么善解人意',
                '你做的每一道菜都很好吃',
                '你陪我度过了最难熬的时光',
                '你的声音是世界上最动听的音乐',
                '你总是包容我的小脾气',
                '你的拥抱让我感到无比安心',
                '你每天早上的问候是我最期待的',
                '你总是记得我不经意说过的话',
                '你的眼睛里有星辰大海',
                '你让我相信爱情的美好',
                '你总是在我需要的时候出现',
                '你的温柔治愈了我所有的不安',
                '你让我变成了更好的自己',
                '你的每一个小习惯我都觉得可爱',
                '你给了我一个温暖的家',
                '你总是愿意听我说话',
                '你的坚强让我佩服',
                '你的天真让我心动',
                '你对生活的热爱感染了我',
                '你总是支持我的梦想',
                '你的每一句"我爱你"都让我心跳加速',
                '你陪我看过最美的日落',
                '你记得我所有的小喜好',
                '你的存在就是最好的礼物',
                '你让平凡的日子变得特别',
                '你的手恰好适合我握着',
                '你总是让我感到被爱',
                '你是我想要共度余生的人',
                '你就是我的全世界'
            ],
            displayedReasons: []
        };
    },

    mounted() {
        // 初始显示前6个理由
        this.displayedReasons = this.reasons.slice(0, 6);

        // 开始倒计时
        this.updateTimeTogether();
        setInterval(this.updateTimeTogether, 1000);
    },

    methods: {
        // 第一次点击：从封面进入烟花页
        goToFireworks() {
            this.showCover = false;
            this.showFireworksPage = true;
            // 播放音乐
            this.playMusic();
            // 开始烟花
            this.startFireworks();
        },

        // 第二次点击：礼花炸开效果
        explodeConfetti() {
            if (!this.confettiExploded) {
                // 触发爆炸动画
                this.confettiExploded = true;

                // 0.6秒后进入主内容（等待爆炸动画完成）
                setTimeout(() => {
                    this.showFireworksPage = false;
                    this.showMainContent = true;
                    // 停止烟花
                    this.stopFireworks();
                    // 重置状态
                    this.confettiExploded = false;
                }, 600);
            }
        },

        // 更新在一起的时间
        updateTimeTogether() {
            const now = new Date();
            const diff = now - this.startDate;

            this.timeTogether.days = Math.floor(diff / (1000 * 60 * 60 * 24));
            this.timeTogether.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.timeTogether.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            this.timeTogether.seconds = Math.floor((diff % (1000 * 60)) / 1000);
        },

        // 显示更多理由
        showMoreReasons() {
            const currentLength = this.displayedReasons.length;
            const nextBatch = this.reasons.slice(currentLength, currentLength + 6);
            this.displayedReasons = [...this.displayedReasons, ...nextBatch];
        },

        // 吹蜡烛
        blowCandles() {
            this.candlesBlown = true;
            // 吹蜡烛后显示烟花庆祝
            this.startFireworks();

            // 10秒后停止烟花
            setTimeout(() => {
                this.stopFireworks();
            }, 10000);
        },

        // 播放音乐
        playMusic() {
            const audio = document.getElementById('bgMusic');
            // 不使用 load()，这样可以从暂停位置继续播放
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.musicPlaying = true;
                    console.log('音乐开始播放');
                }).catch(err => {
                    console.log('音乐播放失败，可能需要用户交互:', err);
                    this.musicPlaying = false;
                });
            }
        },

        // 切换音乐
        toggleMusic() {
            const audio = document.getElementById('bgMusic');

            if (this.musicPlaying) {
                // 暂停音乐（保持当前播放位置）
                audio.pause();
                this.musicPlaying = false;
                console.log('音乐已暂停');
            } else {
                // 从暂停位置继续播放
                const playPromise = audio.play();

                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        this.musicPlaying = true;
                        console.log('音乐继续播放');
                    }).catch(err => {
                        console.log('音乐播放失败:', err);
                        this.musicPlaying = false;
                    });
                }
            }
        },

        // 停止烟花
        stopFireworks() {
            if (this.fireworksAnimationId) {
                cancelAnimationFrame(this.fireworksAnimationId);
                this.fireworksAnimationId = null;

                // 清空画布
                const canvas = document.getElementById('fireworks');
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        },

        // 返回初始状态
        resetToStart() {
            // 停止烟花
            this.stopFireworks();
            
            // 暂停音乐
            const audio = document.getElementById('bgMusic');
            audio.pause();
            audio.currentTime = 0; // 重置音乐到开头
            this.musicPlaying = false;
            
            // 重置所有状态
            this.showCover = true;
            this.showFireworksPage = false;
            this.showMainContent = false;
            this.confettiExploded = false;
            this.candlesBlown = false;
            this.candles = 20;
            
            // 重置显示的理由数量
            this.displayedReasons = this.reasons.slice(0, 10);
        },

        // 烟花效果
        startFireworks() {
            const canvas = document.getElementById('fireworks');
            const ctx = canvas.getContext('2d');

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const fireworks = [];
            const particles = [];

            const self = this; // 保存 this 引用

            class Firework {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = canvas.height;
                    this.targetY = Math.random() * canvas.height * 0.5;
                    this.speed = 5;
                    this.angle = Math.PI / 2;
                    this.hue = Math.random() * 360;
                }

                update() {
                    const dx = 0;
                    const dy = this.targetY - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance > this.speed) {
                        this.y -= this.speed;
                    } else {
                        this.explode();
                        return false;
                    }
                    return true;
                }

                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                    ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
                    ctx.fill();
                }

                explode() {
                    for (let i = 0; i < 30; i++) {
                        particles.push(new Particle(this.x, this.y, this.hue));
                    }
                }
            }

            class Particle {
                constructor(x, y, hue) {
                    this.x = x;
                    this.y = y;
                    this.hue = hue;
                    this.speed = Math.random() * 5 + 2;
                    this.angle = Math.random() * Math.PI * 2;
                    this.velocity = {
                        x: Math.cos(this.angle) * this.speed,
                        y: Math.sin(this.angle) * this.speed
                    };
                    this.alpha = 1;
                    this.decay = Math.random() * 0.015 + 0.015;
                }

                update() {
                    this.velocity.y += 0.1;
                    this.x += this.velocity.x;
                    this.y += this.velocity.y;
                    this.alpha -= this.decay;
                    return this.alpha > 0;
                }

                draw() {
                    ctx.save();
                    ctx.globalAlpha = this.alpha;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
                    ctx.fill();
                    ctx.restore();
                }
            }

            function animate() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                if (Math.random() < 0.05) {
                    fireworks.push(new Firework());
                }

                for (let i = fireworks.length - 1; i >= 0; i--) {
                    if (!fireworks[i].update()) {
                        fireworks.splice(i, 1);
                    } else {
                        fireworks[i].draw();
                    }
                }

                for (let i = particles.length - 1; i >= 0; i--) {
                    if (!particles[i].update()) {
                        particles.splice(i, 1);
                    } else {
                        particles[i].draw();
                    }
                }

                // 保存 animation ID 以便可以停止
                self.fireworksAnimationId = requestAnimationFrame(animate);
            }

            animate();
        }
    }
}).mount('#app');

