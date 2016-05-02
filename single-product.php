<?php get_header(); ?>
<div id="primary">
    <div id="content" role="main">

    
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <?php if (have_posts()) : the_post(); update_post_caches($posts); ?> 
            <h3><?php the_title(); ?></h3> 
            <?php the_content(); ?> 
            <?php endif; ?>
        </article>
 
   
    </div>
</div>
<?php //wp_reset_query(); ?>
<?php get_footer(); ?>