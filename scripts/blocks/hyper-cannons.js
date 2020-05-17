const cracker = extend(BasicBulletType, {
	update: function(b){
		Effects.shake(1.2, 1.2, b.x, b.y);
		if(b.timer.get(1, 5)){
			Damage.collideLine(b, b.getTeam(), this.hitEffect, b.x, b.y, b.rot(), 340.0, true);
		};
		if(Mathf.chance(Time.delta() * 0.2)){
			Tmp.v2.trns(b.rot() + 90.0, Mathf.range(7.0));
			Lightning.create(b.getTeam(), Color.valueOf("ff9c5a"), 10, b.x + Tmp.v2.x, b.y + Tmp.v2.y, b.rot(), 46);
		};
		if(Mathf.chance(Time.delta() * 0.1)){
			Tmp.v3.trns(b.rot(), Mathf.random(0.5, 340.0));
			Lightning.create(b.getTeam(), Color.valueOf("ff9c5a"), 16, b.x + Tmp.v3.x, b.y + Tmp.v3.y, Mathf.random(360), 12);
		}
	},
	
	hit: function(b, hitx, hity){
		if(hitx != null && hity != null){
			Effects.effect(this.hitEffect, Color.valueOf("ec7458aa"), hitx, hity);
			if(Mathf.chance(0.15)){
				Damage.createIncend(hitx, hity, 7, 1);
			}
		}
	},
	
	draw: function(b){
		
		const colors = [Color.valueOf("ec745855"), Color.valueOf("ec7458aa"), Color.valueOf("ff9c5a"), Color.valueOf("ffffff")];
		const tscales = [1, 0.7, 0.5, 0.24];
		const strokes = [3.1, 2.3, 1.6, 0.8];
		const lenscales = [1.0, 1.12, 1.15, 1.164];
		const tmpColor = new Color();

		for(var s = 0; s < 4; s++){
			Draw.color(tmpColor.set(colors[s]).mul(1.0 + Mathf.absin(Time.time(), 1.0, 0.3)));
			for(var i = 0; i < 4; i++){
				Tmp.v1.trns(b.rot() + 180.0, (lenscales[i] - 1.0) * 55.0);
				Lines.stroke((9 + Mathf.absin(Time.time(), 1.4, 2.1)) * b.fout() * strokes[s] * tscales[i]);
				Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), 320.0 * b.fout() * lenscales[i], CapStyle.none);
			}
		};
		Draw.reset();
	}
});

cracker.speed = 0.001;
cracker.damage = 100;
cracker.lifetime = 18;
cracker.hitEffect = Fx.hitMeltdown;
cracker.despawnEffect = Fx.none;
cracker.hitSize = 5;
cracker.drawSize = 660;
cracker.pierce = true;
cracker.shootEffect = Fx.none;
cracker.smokeEffect = Fx.none;

world-cracker.shootType = cracker;
world-cracker.update = true;
