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

	<section
		id="top"
		class="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-24 lg:pt-32"
	>
		<div
			class="pointer-events-none absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl"
			aria-hidden="true"
		>
			<div
				class="relative left-1/2 aspect-[1108/632] w-[72rem] -translate-x-1/2 bg-gradient-to-tr from-emerald-300 via-emerald-100 to-amber-200 opacity-60"
			/>
		</div>

		<div class="relative mx-auto flex max-w-5xl flex-col items-start gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 hero-fade-in">
			<div class="flex-1 space-y-6 section-inview" use:useInView>
				<p class="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-emerald-800 shadow-sm ring-1 ring-emerald-100">
					<span class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
					Lokal hundeluftning i Gjessø
				</p>
				<h1 class="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
					Tryg og kærlig hundeluftning i Gjessø
				</h1>
				<p class="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
					Felix passer din hund, som var den hans egen – med rolig energi, faste rutiner
					og masser af omsorg. Perfekt til travle hverdage eller når du er væk hjemmefra.
				</p>

				<div class="flex flex-wrap items-center gap-3">
					<a href="#kontakt" class="btn-primary">Kontakt Felix</a>
					<button type="button" class="btn-secondary" on:click={() => scrollToSection('om-felix')}>
						Læs mere
					</button>
				</div>

				<dl class="mt-4 grid grid-cols-2 gap-4 text-xs text-slate-600 sm:text-sm">
					<div class="flex items-center gap-2">
						<div class="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
							<span aria-hidden="true">✓</span>
						</div>
						<div>
							<dt class="font-medium text-slate-800">Lokalt kendt</dt>
							<dd>Kender stierne og naturen i Gjessø.</dd>
						</div>
					</div>
					<div class="flex items-center gap-2">
						<div class="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
							<span aria-hidden="true">✓</span>
						</div>
						<div>
							<dt class="font-medium text-slate-800">Tryghed først</dt>
							<dd>Rolig håndtering og faste aftaler.</dd>
						</div>
					</div>
				</dl>
			</div>

			<div class="relative mt-4 w-full max-w-sm self-stretch lg:mt-0 lg:w-80">
				<div
					class="hero-bg-zoom absolute inset-6 -z-10 rounded-3xl bg-[url('https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-60"
					aria-hidden="true"
				/>
				<div
					class="relative h-full rounded-3xl bg-white/80 p-5 shadow-lg ring-1 ring-slate-200 section-inview"
					use:useInView={{ delay: 150 }}
				>
					<div class="mb-4 flex items-center justify-between gap-3">
						<div>
							<p class="text-xs font-medium uppercase tracking-wide text-emerald-700">
								Felix · Gjessø Hundelufter
							</p>
							<p class="text-sm text-slate-600">Tryg hverdag for både hund og ejer.</p>
						</div>
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md">
							<span aria-hidden="true">🐕</span>
						</div>
					</div>

					<ul class="space-y-3 text-sm text-slate-700">
						<li class="flex gap-2">
							<span class="mt-0.5 text-emerald-600">•</span>
							<span>Fast eller fleksibel luftningsaftale efter dit behov.</span>
						</li>
						<li class="flex gap-2">
							<span class="mt-0.5 text-emerald-600">•</span>
							<span>Billede eller kort besked efter hver tur, hvis ønsket.</span>
						</li>
						<li class="flex gap-2">
							<span class="mt-0.5 text-emerald-600">•</span>
							<span>Kun et begrænset antal hunde – fokus på nærvær.</span>
						</li>
					</ul>

					<div class="mt-5 rounded-2xl bg-emerald-50/80 p-3 text-xs text-slate-700">
						<p class="font-medium text-emerald-900">Prøvetur uden binding</p>
						<p>Start med en enkelt luftetur, og se om det føles rigtigt for både dig og din hund.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</header>

<main class="pb-16 sm:pb-24 lg:pb-28">
	<section
		id="om-felix"
		class="section-inview py-12 sm:py-16"
		use:useInView
	>
		<div class="mx-auto max-w-3xl space-y-5 text-left">
			<h2 class="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
				Om Felix
			</h2>
			<p class="text-sm leading-relaxed text-slate-700 sm:text-base">
				Felix er vokset op i Gjessø og kender området, skovstierne og de rolige ruter, som passer
				til forskellige typer hunde. Han lægger vægt på rolig og tillidsfuld kontakt, så både hund
				og ejer kan føle sig trygge, hver gang snoren bliver klikket på.
			</p>
			<p class="text-sm leading-relaxed text-slate-700 sm:text-base">
				Som hundelufter er Felix både ansvarlig og imødekommende. Han lytter til dine ønsker,
				tager hensyn til din hunds tempo og behov – og giver gerne en kort opdatering efter turen,
				hvis du vil vide, hvordan det er gået.
			</p>
			<p class="text-sm leading-relaxed text-slate-700 sm:text-base">
				Aftaler kan tilpasses din hverdag, hvad enten du har brug for fast hjælp i hverdagen,
				ferieaflastning eller blot en enkelt tur en travl dag.
			</p>
		</div>
	</section>

	<section
		id="services"
		class="section-inview border-y border-slate-200/70 bg-white/70 py-12 sm:py-16"
		use:useInView
	>
		<div class="space-y-6">
			<div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h2 class="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
						Ydelser
					</h2>
					<p class="mt-1 max-w-xl text-sm text-slate-700 sm:text-base">
						Fleksible løsninger til både hverdag og særlige perioder – altid med fokus på ro,
						tryghed og faste rutiner.
					</p>
				</div>
			</div>

			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each [
					{
						title: 'Daglig hundeluftning',
						description:
							'Fast aftale på én eller flere ture om ugen. Perfekt til travle hverdage, hvor du vil være sikker på, at din hund bliver aktiveret.',
						detail: 'Fast tidspunkt efter aftale · 30–45 minutter'
					},
					{
						title: 'Feriepasning',
						description:
							'Længere forløb når du er væk hjemmefra. Luftning kombineret med trygge besøg, så din hund bevarer sine velkendte omgivelser.',
						detail: 'Fleksible pakker · Besøg og luftning efter behov'
					},
					{
						title: 'Enkeltstående luftning',
						description:
							'Når kalenderen pludselig er fuld, eller du er sent hjemme. En enkelt tur, der giver dig ro i maven.',
						detail: 'Bookes efter aftale · God til at prøve os af'
					}
				] as service, index}
					<article
						class="card-hover section-inview flex flex-col justify-between p-5"
						use:useInView={{ delay: 120 * index }}
					>
						<div class="space-y-3">
							<h3 class="text-base font-semibold text-slate-900 sm:text-lg">
								{service.title}
							</h3>
							<p class="text-sm leading-relaxed text-slate-700">
								{service.description}
							</p>
						</div>
						<p class="mt-4 text-xs font-medium text-emerald-800 sm:text-sm">
							{service.detail}
						</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section
		id="fordele"
		class="section-inview py-12 sm:py-16"
		use:useInView
	>
		<div class="space-y-8">
			<div class="max-w-3xl space-y-3">
				<h2 class="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
					Hvorfor vælge Gjessø Hundelufter?
				</h2>
				<p class="text-sm leading-relaxed text-slate-700 sm:text-base">
					Det kan være svært at overlade sin hund til andre. Derfor er målet at skabe en ordning,
					der føles rolig, gennemskuelig og personlig – både for dig og din hund.
				</p>
			</div>

			<div class="grid gap-5 sm:grid-cols-2">
				{#each [
					{
						title: 'Tryghed og ansvarlighed',
						body:
							'Dine ønsker og hundens behov er altid udgangspunktet. Aftaler holdes, og du kan regne med klar kommunikation.'
					},
					{
						title: 'Lokalkendskab',
						body:
							'Ruterne planlægges ud fra hundens temperament og form – fra rolige villaveje til mere udfordrende skovstier.'
					},
					{
						title: 'Personlig kontakt',
						body:
							'Du har direkte kontakt til Felix, uden mellemled. Det gør det nemt at justere aftaler og tage særlige hensyn.'
					},
					{
						title: 'Kærlighed til dyr',
						body:
							'Hunde er ikke “bare” dyr. De er en del af familien – og behandles derefter med tålmodighed og respekt.'
					}
				] as item, index}
					<div
						class="card-hover section-inview p-5"
						use:useInView={{ delay: 80 * index }}
					>
						<h3 class="text-sm font-semibold text-slate-900 sm:text-base">{item.title}</h3>
						<p class="mt-2 text-sm leading-relaxed text-slate-700">
							{item.body}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section
		id="kontakt"
		class="section-inview border-t border-slate-200/70 bg-white/80 py-12 sm:py-16"
		use:useInView
	>
		<div class="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
			<div class="space-y-4">
				<h2 class="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
					Kontakt
				</h2>
				<p class="text-sm leading-relaxed text-slate-700 sm:text-base">
					Skriv en kort besked om din hund og dit behov, så vender Felix tilbage med et forslag
					til en løsning – helt uforpligtende.
				</p>

				<div class="mt-4 rounded-2xl bg-emerald-50/80 p-4 text-sm text-slate-800">
					<p class="font-medium text-emerald-900">Direkte kontakt</p>
					<p class="mt-1">Telefon: <span class="font-mono">+45 00 00 00 00</span> (placeholder)</p>
					<p>E-mail: <span class="font-mono">kontakt@example.dk</span> (opdateres efter behov)</p>
				</div>
			</div>

			<form class="card-hover space-y-4 p-5" novalidate>
				<div>
					<label for="navn" class="block text-xs font-medium uppercase tracking-wide text-slate-700">
						Navn
					</label>
					<input
						id="navn"
						name="navn"
						type="text"
						autocomplete="name"
						class="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
						placeholder="Dit navn"
					/>
				</div>

				<div>
					<label for="email" class="block text-xs font-medium uppercase tracking-wide text-slate-700">
						E-mail
					</label>
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						class="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
						placeholder="din@mail.dk"
					/>
				</div>

				<div>
					<label for="besked" class="block text-xs font-medium uppercase tracking-wide text-slate-700">
						Besked
					</label>
					<textarea
						id="besked"
						name="besked"
						rows="4"
						class="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
						placeholder="Fortæl kort om din hund, og hvornår du har brug for hjælp."
					/>
				</div>

				<button type="submit" class="btn-primary w-full sm:w-auto">
					Send besked (demo)
				</button>

				<p class="text-xs text-slate-500">
					Formularen er kun en visuel demo – du kan selv tilføje rigtig afsendelse senere, fx via
					e-mail eller et simpelt backend‑endpoint.
				</p>
			</form>
		</div>
	</section>
</main>

<footer class="border-t border-slate-200/70 bg-white/80 py-6">
	<div class="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 px-4 text-xs text-slate-600 sm:flex-row sm:items-center sm:px-6 lg:px-8">
		<p>&copy; {new Date().getFullYear()} Gjessø Hundelufter · Felix · Gjessø.</p>
		<p>En lille lokal tjeneste med fokus på ro, tryghed og nærvær.</p>
	</div>
</footer>
