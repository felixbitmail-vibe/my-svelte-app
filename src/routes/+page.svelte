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
				if (newOptions?.delay !== undefined && newOptions.delay !== opts.delay) {
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

<header class="relative">
	<nav
		class="fixed inset-x-0 top-0 z-40 transition-all duration-300 bg-transparent"
		class:bg-white={hasScrolled}
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
					<span class="text-[11px] text-slate-600">Tryg hundeluftning i Gjessø</span>
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

	<section id="top" class="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-24 lg:pt-32">
		<div class="relative mx-auto flex max-w-5xl flex-col items-start gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
			<div class="flex-1 space-y-6 section-inview" use:useInView>
				<p class="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-emerald-800 shadow-sm ring-1 ring-emerald-100">
					Lokal hundeluftning i Gjessø
				</p>

				<h1 class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
					Tryg og kærlig hundeluftning i Gjessø
				</h1>

				<p class="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
					Felix passer din hund, som var den hans egen – med rolig energi, faste rutiner
					og masser af omsorg.
				</p>
			</div>

			<div class="relative mt-4 w-full max-w-sm self-stretch lg:mt-0 lg:w-80">
				<div
					class="relative h-full rounded-[2rem] bg-white/80 p-6 sm:p-7 shadow-xl ring-1 ring-white/70 backdrop-blur-sm section-inview"
					use:useInView={{ delay: 150 }}
				>
					<ul class="space-y-3 text-sm text-slate-700 list-disc list-inside">
						<li>Fast eller fleksibel luftningsaftale efter dit behov.</li>
						<li>Billede eller kort besked efter hver tur, hvis ønsket.</li>
						<li>Kun et begrænset antal hunde – fokus på nærvær.</li>
					</ul>

					<div class="mt-5 rounded-2xl bg-emerald-50/80 p-3 text-xs text-slate-700">
						<p class="font-medium text-emerald-900">Prøvetur uden binding</p>
						<p>Start med en enkelt luftetur, og se om det føles rigtigt.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</header>

<footer class="border-t border-slate-200/70 bg-white/80 py-6">
	<div class="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 px-4 text-xs text-slate-600 sm:flex-row sm:items-center sm:px-6 lg:px-8">
		<p>&copy; {new Date().getFullYear()} Gjessø Hundelufter · Felix · Gjessø.</p>
		<p>En lille lokal tjeneste med fokus på ro, tryghed og nærvær.</p>
	</div>
</footer>