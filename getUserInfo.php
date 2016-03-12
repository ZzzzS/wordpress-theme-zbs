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
			$avatars = get_user_meta( $user->ID, 'wp_user_avatars', true );
			if(!empty($avatars)) $userInfo["avatar"] = $avatars['250'];
			
			global $wpdb; 
			$author_id = $user->ID; 
			$sql =  "SELECT * FROM $wpdb->posts WHERE post_status IN ('publish','static') AND post_author = '$author_id' AND post_type ='post'LIMIT 5" ; //查询作者文章数量   
			$posts= $wpdb->get_results($sql);
			$html = '';
			foreach ($posts as $post) {
				$html .= '<li><a href="'.$post->guid.'" rel="twipsy" title="'.$post->post_title.'">'. mb_strimwidth($post->post_title, 0, 20,"...").'</a></li>';   
			} 
			$userInfo["posts"] = $html;
			$users[$user->display_name] = $userInfo;
		}
		$jsdata=json_encode($users,JSON_UNESCAPED_UNICODE);
		echo $jsdata;
	}
?>