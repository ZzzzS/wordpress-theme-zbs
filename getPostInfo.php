<?php 
	define('BASE_PATH',str_replace( '\\' , '/' , realpath(dirname(__FILE__).'/../../../../')));//获取根目录
	require(BASE_PATH.'/public_html/wp-load.php' );//关联wordpress，可以调用wordpress里的函数 
	
	//global $post;
	$args = array(
		'posts_per_page' => -1,
		'post_type' => 'product'
	);
	$query=new WP_Query($args);
	$total_posts = $query->post_count;

	$posts = array();
	if($query->have_posts()){
		$i = 0;
		while($query->have_posts()){
			$query->the_post();
			$postInfo = array();
			$postInfo["title"] = $post->post_title;
			$postInfo["link"] = $post->guid;
			$cat = get_the_terms( $post->ID, 'product_category' ,  ' ' );
			$postInfo["color"] = get_option('product_category_color'.$cat[0]->term_id);
			$posts[$i] = $postInfo;
			$i++;
		}
		
	}
	

	$jsdata=json_encode($posts);
	echo $jsdata;
	
?>