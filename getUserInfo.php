<?php 
	define('BASE_PATH',str_replace( '\\' , '/' , realpath(dirname(__FILE__).'/../../../../')));//获取根目录
	require(BASE_PATH.'/www/wp-load.php' );//关联wordpress，可以调用wordpress里的函数 !!!!!这里在服务器会出错!!!!!!
	$userRole = $_GET["userRole"];
	if(strlen($userRole) > 0){
		$args = array('role' => $userRole, );
		$blogusers = get_users($args);
		$users = array();
		foreach ($blogusers as $user){
			$userInfo = array();
			$userInfo["name"] = $user->display_name;
			$users[$user->display_name] = $userInfo;
		}
		$jsdata=json_encode($users,JSON_UNESCAPED_UNICODE);
		echo $jsdata;
	}
	
	
?>