#pragma strict
var speed:int = 5;
var mouse_pos:Vector3;
var target:Transform;
var object_pos:Vector3;
var angle:float;
var bullet:GameObject;
var bSpeed:int = 20;
public var health:int = 100;
var score:int = 0;

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
		var bulletClone:GameObject = Instantiate(bullet, transform.position, transform.rotation);
		bulletClone.AddComponent.<Rigidbody>();
		bulletClone.transform.Translate(Vector2.up * bSpeed);
		bulletClone.name = "Bullet(Clone)";
	}
}

function OnGUI()
{
	GUI.Label(Rect(10,10,100,20), "Score: " + score.ToString);
	GUI.Label(Rect(10,20,100,20), "Health: " + health.ToString);
}

function hit()
{
	health -= 25;
	if(health < 0)
		Destroy(this.gameObject);
}