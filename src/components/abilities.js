

import { AbilityBuilder, PureAbility } from '@casl/ability';

export default function defineAbilitiesFor(role) {
  const { can, cannot, build } = new AbilityBuilder(PureAbility);

  console.log('Rol Abilitie', role);

  switch (role) {
    case 1:
      can('manage','all'); // Permiso para gestionar todos los recursos
      break;
      case 2:
        can('read', 'all'); // Permiso para gestionar todos los recursos
      break;
      case 3:
        can('create', 'CrearOT'); // Permiso para leer todos los recursos
        can('manage','Supervisor'); // Permiso para gestionar todos los recursos
      
        break;
      case 7:
      can('create', 'BotonOT'); // Permiso para gestionar todos los recursos
     
      break;
    default:
      can('read', 'all'); // Permiso predeterminado de lectura
      cannot('delete', 'all'); // No puede eliminar ningún recurso
      break;
  }

  const ability = build();

  console.log('Habilidades definidas:', ability.rules); // Verifica las reglas definidas

  return ability;
}

