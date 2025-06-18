import { CAMERA_ACTIONS } from './const';

// Puedes agregar aquí más imports para otros arreglos de acciones si lo deseas
// import { SECTOR_ACTIONS } from './const';
// import { USER_ACTIONS } from './const';

function assertNoDuplicates(arr: readonly unknown[], name: string) {
  const set = new Set(arr);
  expect(set.size).toBe(arr.length);
}

describe('Permisos de acciones', () => {
  it('CAMERA_ACTIONS no debe tener acciones duplicadas', () => {
    assertNoDuplicates(CAMERA_ACTIONS, 'CAMERA_ACTIONS');
  });

  // Descomenta y adapta para otros recursos
  // it('SECTOR_ACTIONS no debe tener acciones duplicadas', () => {
  //   assertNoDuplicates(SECTOR_ACTIONS, 'SECTOR_ACTIONS');
  // });
});
