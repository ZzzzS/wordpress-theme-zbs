<?php 
	define('BASE_PATH',str_replace( '\\' , '/' , realpath(dirname(__FILE__).'/../../../../')));//获取根目录
	require(BASE_PATH.'/public_html/wp-load.php' );//关联wordpress，可以调用wordpress里的函数 
	$postId = $_GET["id"];
	$title = $_GET["title"];
	if(strlen($postId) > 0){
		
		$args = array(
			'post_type' => 'product',
			'p' => $postId
		);
		
		$query=new WP_Query($args);
		
		if($query->have_posts()){
			while($query->have_posts()){
				$query->the_post();
				if(strlen($title) > 0 && $title == "true"){
					echo "<h2><b>".$post->post_title."</b></h2>";
				}
				the_content();
				
			}
		}
		
		wp_reset_query();
	}
?>