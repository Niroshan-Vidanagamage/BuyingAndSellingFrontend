import FilterBlock, { FilterState, FiltersProps } from './ui/FilterBlock.tsx';

export type { FilterState };

export default function Filters(props: FiltersProps) {
  return <FilterBlock {...props} />;
}