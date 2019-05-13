<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$USER->Logout();
header("Location: /");
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");
?>