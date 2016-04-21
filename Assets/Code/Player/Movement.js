#pragma strict
var speed:int = 5;
var mouse_pos:Vector3;
var target:Transform;
var object_pos:Vector3;
var angle:float;
var bullet:GameObject;
var bSpeed:int = 20;
var ammo:int = 5;

function OnCollisionEnter2D(col:Collision2D)
{
	if(col.gameObject == "Health")
	{
		GameObject.Find("Main Camera").GetComponent(scoreSheet).heal();
		Destroy(gameObject.Find("Health"));
	}
	else if(col.gameObject == "Ammo")
	{
		ammo += 5;
		Destroy(gameObject.Find("Ammo"));
	}
}

function Update ()
{
	move();
	run();
	mouseLook();
	shoot();
}

function move()
{
	if(Input.GetKey(KeyCode.D))
		transform.Translate(Vector3.right * speed * Time.deltaTime);
	if(Input.GetKey(KeyCode.A))
		transform.Translate(Vector3.left * speed * Time.deltaTime);
	if(Input.GetKey(KeyCode.S))
		transform.Translate(Vector3.down * speed * Time.deltaTime);
	if(Input.GetKey(KeyCode.W))
		transform.Translate(Vector3.up * speed * Time.deltaTime);
}

function run()
{
	if(Input.GetKey(KeyCode.LeftShift))
		speed = 15;
	else
		speed = 5;
}

function mouseLook()
{
     mouse_pos = Input.mousePosition;
     mouse_pos.z = 5.23;
     object_pos = Camera.main.WorldToScreenPoint(target.position);
     mouse_pos.x = mouse_pos.x - object_pos.x;
     mouse_pos.y = mouse_pos.y - object_pos.y;
     angle = Mathf.Atan2(mouse_pos.y, mouse_pos.x) * Mathf.Rad2Deg;
     transform.rotation = Quaternion.Euler(Vector3(0, 0, angle-90));
}

function shoot()
{
	if(Input.GetKeyDown(KeyCode.Space))
	{
		if(ammo > 0)
		{
			var bulletClone:GameObject = Instantiate(bullet, transform.position, transform.rotation);
			bulletClone.transform.Translate(Vector2.up * 2);
			bulletClone.GetComponent(Rigidbody2D).AddForce(transform.up * 1000);
			bulletClone.name = "Bullet(Clone)";
			ammo--;
		}
	}
}