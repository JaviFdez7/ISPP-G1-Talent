import React, { useState, useEffect } from 'react'

function ImageDisplay({ imageData }) {
	const [imageUrl, setImageUrl] = useState(null)

	useEffect(() => {
		// Convertir los datos en un Blob
		const blob = new Blob([new Uint8Array(imageData.data)], { type: imageData.contentType })

		// Crear una URL de objeto desde el Blob
		const url = URL.createObjectURL(blob)

		// Actualizar el estado con la URL de la imagen
		setImageUrl(url)

		// Liberar la URL del objeto cuando el componente se desmonte
		return () => URL.revokeObjectURL(url)
	}, [imageData])

	return (
		<img
			src={imageUrl}
			className='rounded-full border border-gray-300 profile-img'
			style={{
				objectFit: 'cover',
				objectPosition: 'center',
				width: '300px',
				height: '300px',
			}}
		/>
	)
}

export default ImageDisplay
