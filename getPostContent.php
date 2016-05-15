<?php 
	define('BASE_PATH',str_replace( '\\' , '/' , realpath(dirname(__FILE__).'/../../../../')));//获取根目录
	require(BASE_PATH.'/public_html/wp-load.php' );//关联wordpress，可以调用wordpress里的函数 
	$postId = $_GET["id"];
	$title = $_GET["title"];
	if(strlen($postId) > 0){
		$post = get_post( $postId );
		if(strlen($title) > 0 && $title == "true"){
			echo "<h2><b>".$post->post_title."</b></h2>";
		}
		echo $post->post_content; 
	}
?>