<?php 
	define('BASE_PATH',str_replace( '\\' , '/' , realpath(dirname(__FILE__).'/../../../../')));//获取根目录
	require(BASE_PATH.'/public_html/wp-load.php' );//关联wordpress，可以调用wordpress里的函数 
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
			$userInfo["id"] = $author_id;
			$sql =  "SELECT * FROM $wpdb->posts WHERE post_status IN ('publish','static') AND post_author = '$author_id' AND (post_type ='post' OR post_type ='product') LIMIT 15" ; //查询作者文章数量   
			$ps= $wpdb->get_results($sql);
			//$html = '';
			$posts = array();
			$n = 0;
			foreach ($ps as $p) {
				//$html .= '<li><a href="'.$p->guid.'" rel="twipsy" title="'.$p->post_title.'">'. mb_strimwidth($p->post_title, 0, 20,"...").'</a></li>';
				$post = array();
				$post["title"] = $p->post_title;
				$post["id"] = $p->ID;
				$post["link"] = $p->guid;
				$posts[$n] = $post;
				$n++;
			} 
			$userInfo["posts"] = $posts;
			$users[$user->display_name] = $userInfo;
		}
		$jsdata=json_encode($users);
		echo $jsdata;
	}
?>