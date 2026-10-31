import type { Meta, StoryObj } from '@storybook/react-vite';

import { WeekdayAvailability, type WeekdayAvailabilityProps } from './WeekdayAvailability';

const days = [
  { key: 'mon', label: 'SEG', fullLabel: 'Segunda-feira', available: true },
  { key: 'tue', label: 'TER', fullLabel: 'Terça-feira', available: true },
  { key: 'wed', label: 'QUA', fullLabel: 'Quarta-feira', available: true },
  { key: 'thu', label: 'QUI', fullLabel: 'Quinta-feira', available: true },
  { key: 'fri', label: 'SEX', fullLabel: 'Sexta-feira', available: true },
  { key: 'sat', label: 'SAB', fullLabel: 'Sábado', available: false },
  { key: 'sun', label: 'DOM', fullLabel: 'Domingo', available: false }
];

// A bolinha da legenda é do app; aqui só ilustra o desenho.
const legend = (
  <>
    <span aria-hidden="true" style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--button-primary)' }} />
    disponível para uso
  </>
);

const meta = {
  title: 'Components/WeekdayAvailability',
  component: WeekdayAvailability,
  args: {
    days,
    'aria-label': 'Disponível para uso nos dias',
    availableLabel: 'disponível para uso',
    unavailableLabel: 'indisponível',
    legend
  },
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 390, padding: 12, boxSizing: 'border-box' }}><Story /></div>]
} satisfies Meta<WeekdayAvailabilityProps>;

export default meta;
type Story = StoryObj<WeekdayAvailabilityProps>;

export const Default: Story = {};

export const AllDays: Story = { args: { days: days.map((day) => ({ ...day, available: true })) } };

export const WithoutLegend: Story = { args: { legend: undefined } };

export const English: Story = {
  args: {
    days: [
      { key: 'mon', label: 'MON', fullLabel: 'Monday', available: true },
      { key: 'tue', label: 'TUE', fullLabel: 'Tuesday', available: true },
      { key: 'wed', label: 'WED', fullLabel: 'Wednesday', available: true },
      { key: 'thu', label: 'THU', fullLabel: 'Thursday', available: true },
      { key: 'fri', label: 'FRI', fullLabel: 'Friday', available: true },
      { key: 'sat', label: 'SAT', fullLabel: 'Saturday', available: false },
      { key: 'sun', label: 'SUN', fullLabel: 'Sunday', available: false }
    ],
    'aria-label': 'Available for use on',
    availableLabel: 'available',
    unavailableLabel: 'unavailable'
  }
};

export const NarrowScreen: Story = {
  decorators: [(Story) => <div style={{ width: 296 }}><Story /></div>]
};
