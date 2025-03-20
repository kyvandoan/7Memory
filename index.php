<?php
require_once __DIR__ . '/vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader('templates');
$twig = new \Twig\Environment($loader, [
]);

$context = array();

$emojisJSON = json_decode(file_get_contents('assets/array.json'), true);
$emojis = $emojisJSON['emojis'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $context['gridSize'] = $_POST['grid'];
    $numberOfImage = ((int)$_POST['grid'] * (int)$_POST['grid']) / 2;
    $randomEmojis = array_rand($emojis, $numberOfImage);
    $fullArrayEmojis = array_merge($randomEmojis, $randomEmojis);
    shuffle($fullArrayEmojis);
    foreach ($fullArrayEmojis as $key => $value) {
        $fullArrayEmojis[$key] = $emojis[$value];
    }
    $context['emojis'] = $fullArrayEmojis;
}

echo $twig->render('index.twig', [ 'context' => $context ] );