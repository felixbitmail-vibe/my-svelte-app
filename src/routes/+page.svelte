<script lang="ts">
	import { onMount } from 'svelte';
	import type { Action } from 'svelte/action';

	let hasScrolled = false;

	onMount(() => {
		const handleScroll = () => {
			hasScrolled = window.scrollY > 10;
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => window.removeEventListener('scroll', handleScroll);
	});

	type InViewOptions = {
		threshold?: number;
		rootMargin?: string;
		once?: boolean;
		delay?: number;
	};

	const useInView: Action<HTMLElement, InViewOptions | undefined> = (node, options) => {
		const opts: Required<InViewOptions> = {
			threshold: options?.threshold ?? 0.2,
			rootMargin: options?.rootMargin ?? '0px 0px -10% 0px',
			once: options?.once ?? true,
			delay: options?.delay ?? 0
		};

		node.dataset.inview = 'false';

		if (opts.delay > 0) {
			node.style.transitionDelay = `${opts.delay}ms`;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						node.dataset.inview = 'true';

						if (opts.once) {
							observer.unobserve(node);
						}
					}
				}
			},
			{
				threshold: opts.threshold,
				rootMargin: opts.rootMargin
			}
		);

		observer.observe(node);

		return {
			update(newOptions) {
				if (
					newOptions?.delay !== undefined &&
					newOptions.delay !== opts.delay
				) {
					node.style.transitionDelay = `${newOptions.delay}ms`;
				}
			},
			destroy() {
				observer.disconnect();
			}
		};
	};

	const scrollToSection = (id: string) => {
		const el = document.getElementById(id);
		if (!el) return;
		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
</script>

<!-- Everything below remains exactly as you wrote it -->

<header class="relative">
	<nav
		class="fixed inset-x-0 top-0 z-40 transition-all duration-300 bg-transparent"
		class:bg-white={hasScrolled}
		class:bg-transparent={!hasScrolled}
		class:backdrop-blur-md={hasScrolled}
		class:shadow-sm={hasScrolled}
	>
		<div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
			<button
				type="button"
				class="flex items-center gap-2"
				on:click={() => scrollToSection('top')}
			>
				<div
					class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-white shadow-sm"
					aria-hidden="true"
				>
					<span class="text-lg">🐾</span>
				</div>
				<div class="flex flex-col items-start">
					<span class="text-xs font-semibold tracking-wide text-emerald-900">
						Gjessø Hundelufter
					</span>
					<span class="text-[11px] text-slate-600">
						Tryg hundeluftning i Gjessø
					</span>
				</div>
			</button>

			<div class="hidden items-center gap-6 text-sm font-medium text-slate-700 sm:flex">
				<button type="button" class="hover:text-emerald-800" on:click={() => scrollToSection('om-felix')}>
					Om Felix
				</button>
				<button type="button" class="hover:text-emerald-800" on:click={() => scrollToSection('services')}>
					Ydelser
				</button>
				<button type="button" class="hover:text-emerald-800" on:click={() => scrollToSection('fordele')}>
					Derfor os
				</button>
				<button type="button" class="hover:text-emerald-800" on:click={() => scrollToSection('kontakt')}>
					Kontakt
				</button>
			</div>
		</div>
	</nav>

	<!-- The rest of your markup continues unchanged -->
</header>