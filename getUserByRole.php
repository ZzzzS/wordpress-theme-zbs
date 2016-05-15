<?php 
	define('BASE_PATH',str_replace( '\\' , '/' , realpath(dirname(__FILE__).'/../../../../')));//获取根目录
	require(BASE_PATH.'/public_html/wp-load.php' );//关联wordpress，可以调用wordpress里的函数 
    echo "xx";
	$Role = $_GET["role"];
    if(strlen($Role) > 0){
        $args = array('role' => $Role, );
        $blogusers = get_users($args);
?>

        <?php foreach ($blogusers as $user): ?>
            <option><?php echo $user->display_name; ?></option>
        <?php endforeach; ?>

        
        
<?php }?>