import type { ComponentInstance } from 'astro';

interface FixtureProps {
  [key: string]: any;
}

export async function loadFixture(componentName: string, props: FixtureProps = {}): Promise<ComponentInstance> {
  const fixture = await import(`../${componentName}`);
  return fixture.default(props);
} 