<?php get_header(); ?>
<div id="primary">
    <div id="content" role="main">

    
        <article id="post-<?php the_ID(); ?>" class="articleBody">
            <?php if (have_posts()) : the_post(); update_post_caches($posts); ?> 
            <?php 
                $author_id = $post->post_author;
                $author_name = get_the_author_meta("display_name",$author_id);
                $major = get_post_meta( $post->ID, '_product_major', true );
                $subMajor = get_post_meta( $post->ID, '_product_subMajor', true );
                $productType = get_post_meta( $post->ID, '_product_type', true );
                $creationDate = get_post_meta( $post->ID, '_product_creation_date', true );
            ?>
            <h2><?php the_title(); ?></h2>
            <div id="postMeta">
                <div class="postMeta" title="author">作者：<?php echo $author_name?></div>
                <div class="postMeta" title="productType">作品类型：<?php echo $productType?></div>
                <div class="postMeta" title="major">专业：<?php echo $major.'-'.$subMajor ?></div>
                <div class="postMeta" title="creationDate">创作年份：<?php echo $creationDate?></div>
            </div>
            <?php the_content(); ?> 
            <?php endif; ?>
        </article>
 
   
    </div>
</div>
<?php //wp_reset_query(); ?>
<?php get_footer(); ?>