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
			$author_id = $post->post_author;
			$postInfo["author"] = get_the_author_meta("display_name",$author_id);
			$postInfo["creationDate"] = get_post_meta( $post->ID, '_product_creation_date', true );
			$postInfo["major"] = get_post_meta( $post->ID, '_product_major', true );
			$postInfo["subMajor"] = get_post_meta( $post->ID, '_product_subMajor', true );
			$postInfo["productType"] = get_post_meta( $post->ID, '_product_type', true );
			$postInfo["title"] = $post->post_title;
			$postInfo["link"] = get_permalink();
			$postInfo["id"] = $post->ID;
			
			$thumbnail_id = get_post_thumbnail_id();
			if($thumbnail_id ){
				$thumb = wp_get_attachment_image_src($thumbnail_id);
				$postInfo["thumbnail"] = $thumb[0];
			}else{
				$postInfo["thumbnail"] = get_template_directory_uri()."/image/sky01.jpg";
			}
			$cat = get_the_terms( $post->ID, 'product_category' ,  ' ' );
			$postInfo["cat"] = $cat[0]->name;
			$postInfo["color"] = get_option('product_category_color'.$cat[0]->term_id);
			$posts[$i] = $postInfo;
			$i++;
		}
		
	}
	

	$jsdata=json_encode($posts);
	echo $jsdata;
	
?>