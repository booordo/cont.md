<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Регистрация конфигурации");
?>

<?$APPLICATION->IncludeComponent("custom:config.registration", []);?>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>