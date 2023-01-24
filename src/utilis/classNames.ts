export default function classNames(...clasess: string[]): string {
	return clasess.filter(Boolean).join(' ');
}
