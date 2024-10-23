import React, { createContext, useContext, useState, useEffect } from 'react';
import { createMongoAbility } from '@casl/ability';
import defineAbilitiesFor from './abilities'; // Ajusta la ruta según donde esté definido tu archivo de habilidades

const AbilityContext = createContext();

export const AbilityProvider = ({ children }) => {
  const [ability, setAbility] = useState(createMongoAbility());

  // Función para actualizar las habilidades basadas en el token
  const updateAbilities = () => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log('Aqui Token',decodedToken)
      const userRole = decodedToken.id_rol;
      const newAbility = defineAbilitiesFor(userRole); // Define las habilidades según el rol del usuario
      setAbility(newAbility);
    }
  };

  useEffect(() => {
    // Actualizar las habilidades al cargar la página
    updateAbilities();

    // Función para recargar la página cuando las habilidades se actualizan
    const reloadPage = () => {
      window.location.reload();
    };

    // Suscribirse a eventos de cambio de token o rol para actualizar las habilidades
    window.addEventListener('tokenChange', () => {
      updateAbilities();
      reloadPage(); // Recargar la página cuando cambia el token
    });

    window.addEventListener('roleChange', () => {
      updateAbilities();
      reloadPage(); // Recargar la página cuando cambia el rol
    });

    // Limpiar el efecto para evitar fugas de memoria
    return () => {
      window.removeEventListener('tokenChange', reloadPage);
      window.removeEventListener('roleChange', reloadPage);
    };
  }, []);

  console.log('Habilidades actuales:', ability.rules); // Verifica las habilidades actuales en el contexto

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};

export const useAbility = () => useContext(AbilityContext);
