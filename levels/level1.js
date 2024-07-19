
let level1 = null;
function createLevel1() {
    level1 = new Level(
        [
            new PufferFisch(1400, 150),
            new PufferFisch(1400, 300),
            new PufferFisch(1000, 200),
            new JellyFish(1300, 0),
            new JellyFish(1600, 100),
            new PufferFisch(3200, 100),
            new PufferFisch(3700, 200),
            new PufferFisch(3200, 300),
            new JellyFish(4000, 0),
            new JellyFish(3800, 100),
            new Endboss()
        ],
        [
            new BackgroundObject('img/3. Background/Layers/5. Water/L2.png', -720,0),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L2.png', -720,0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L2.png', -720,0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/L2.png', -720,0),
            new BackgroundObject('img/3. Background/Layers/1. Light/2.png', -720,0),
            new BackgroundObject('img/3. Background/Layers/5. Water/L1.png', 0,0),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L1.png', 0,0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L1.png', 0,0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/L1.png', 0,0),
            new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 0,0),
            new BackgroundObject('img/3. Background/Layers/5. Water/L2.png', 720,0),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L2.png', 720,0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L2.png', 720,0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/L2.png', 720,0),
            new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 720,0),
            new BackgroundObject('img/3. Background/Layers/5. Water/L1.png', 1440,0),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L1.png', 1440,0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L1.png', 1440,0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/L1.png', 1440,0),
            new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 1440,0),
            new BackgroundObject('img/3. Background/Layers/5. Water/L2.png', 2160,0),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L2.png', 2160,0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L2.png', 2160,0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/L2.png', 2160,0),
            new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 2160,0),
            new BackgroundObject('img/3. Background/Layers/5. Water/L1.png', 2880,0),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L1.png', 2880,0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L1.png', 2880,0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/L1.png', 2880,0),
            new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 2880,0),
            new BackgroundObject('img/3. Background/Layers/5. Water/L2.png', 3600,0),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L2.png', 3600,0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L2.png', 3600,0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/L2.png', 3600,0),
            new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 3600,0),
            new BackgroundObject('img/3. Background/Layers/5. Water/L1.png', 4320,0),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L1.png', 4320,0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L1.png', 4320,0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/L1.png', 4320,0),
            new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 4320,0),
            new BackgroundObject('img/3. Background/Layers/5. Water/L2.png', 5040,0),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L2.png', 5040,0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L2.png', 5040,0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/L2.png', 5040,0),
            new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 5040,0),
            new BackgroundObject('img/3. Background/Layers/5. Water/L1.png', 5760,0),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L1.png', 5760,0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/L1.png', 5760,0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/L1.png', 5760,0),
            new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 5760,0),
        ],
        [
            new Poison(2000, 100),
            new Poison(2000, 50),
            new Poison(2000, 0),
            new Poison(2050, 100),
            new Poison(2100, 100),
            new Poison(2150, 100),
            new Poison(2200, 100),
            new Poison(2250, 100),
            new Poison(2300, 100),
            new Poison(2000, 300),
            new Poison(2000, 350),
            new Poison(2000, 400),
            new Poison(2000, 450),
            new Poison(2000, 300),
            new Poison(2000, 300),
            new Poison(2050, 300),
            new Poison(2100, 300),
            new Poison(2150, 300),
            new Poison(2200, 300),
            new Poison(2250, 300),
            new Poison(2300, 300),
            new Poison(2350, 300),
            new Poison(2400, 300),
            new Poison(2450, 300),
            new Poison(2500, 300),
            new Poison(2550, 250),
            new Poison(2550, 200),
            new Poison(2550, 150),
            new Poison(2550, 100),
            new Poison(2600, 100),
            new Poison(2650, 100),
            new Poison(2700, 100),
            new Poison(2750, 100),
            new Poison(4300, 0),
            new Poison(4300, 50),
            new Poison(4300, 100),
            new Poison(4300, 300),
            new Poison(4300, 350),
            new Poison(4300, 400),
            new Poison(4300, 450),
        ],
        [
            new Coins(2100, 30),
            new Coins(2550, 30),
            new Coins(1270, 150),
            new Coins(1500, 350),
            new Coins(1730, 150),
            new Coins(2700, 350),
            new Coins(3400, 100),
            new Coins(3500, 200),
            new Coins(3600, 300),
            new Coins(3700, 200),
        ],
    );
}