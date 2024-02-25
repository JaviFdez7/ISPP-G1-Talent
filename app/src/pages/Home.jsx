import React from "react";

export default function Home() {
  return (
    <section className="text-gray-600 body-font bg-gray-400">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="https://dummyimage.com/720x600"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Funcionalidades
            <br className="hidden lg:inline-block" />
            de la aplicación
          </h1>
          <p className="mb-8 leading-relaxed text-red-800 text-lg">
            CRUD de tareas, CRUD de proyectos, Listado y Creación de personas y
            CRUD de videojuegos (con permiso de auth para poder crear, editar y
            borrar videojuegos), registro de usuarios, login de usuarios y
            cierre de sesión.
          </p>
        </div>
      </div>
    </section>
  );
}
