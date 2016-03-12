<?php 
	define('BASE_PATH',str_replace( '\\' , '/' , realpath(dirname(__FILE__).'/../../../../')));//获取根目录
	require(BASE_PATH.'/www/wp-load.php' );//关联wordpress，可以调用wordpress里的函数 !!!!!这里在服务器会出错!!!!!!
	
	//global $post;
	$args = array(
		'posts_per_page' => 0,

	);
	$query=new WP_Query($args);
	$total_posts = $query->post_count;

	$posts = array();
	if($query->have_posts()){
		$i = 0;
		while($query->have_posts()){
		$query->the_post();
		//echo "xxxx";
		$postInfo = array();
		$postInfo["title"] = $post->post_title;
		
		$posts[$i] = $postInfo;
		$i++;
		}
		
	}
	

	$jsdata=json_encode($posts,JSON_UNESCAPED_UNICODE);
	echo $jsdata;
	
?>