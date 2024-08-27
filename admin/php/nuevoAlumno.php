<?php
require "../../conn/conn.php";

// Obtén los datos enviados desde el formulario de edición
$nombreNew = $_POST['nombreNew'];
$dniNew = $_POST['dniNew'];
;
$userNew=$_POST['userNew'];
$passNew=$_POST['passNew'];
$telefono=$_POST['telefono'];
$email=$_POST['email'];

// Consulta SQL para actualizar la publicación


$sql = "INSERT INTO `users`(`nombreCompleto`, `dni`, `user`, `pass`, email, telefono) 
VALUES (:n,:d,:u,:p,:e,:t)";

// Preparar la consulta
$stmt = $conn->prepare($sql);
$stmt->bindParam(':n', $nombreNew);
$stmt->bindParam(':d', $dniNew);
$stmt->bindParam(':u', $userNew);
$stmt->bindParam(':p', $passNew);
$stmt->bindParam(':e', $email);
$stmt->bindParam(':t', $telefono);

// Ejecutar la consulta
if ($stmt->execute()) {
    echo json_encode("ok");
} else {
    echo json_encode("Error al guardar el pago.");
}
?>
