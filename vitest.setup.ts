import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Sem os globais do Vitest, a Testing Library não limpa a tela sozinha entre
// os testes.
afterEach(() => cleanup());
