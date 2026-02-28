<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
		);
		document.querySelectorAll('.animate-section').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});

	const packages = [
		{
			title: 'Halv time',
			desc: 'Kort tur i nærheden – perfekt til en hurtig luftning.',
			price: 'Pris ved forespørgsel',
			cta: 'Vælg'
		},
		{
			title: 'Time',
			desc: 'Ordentlig tur med masser af snusen og motion i naturen.',
			price: 'Pris ved forespørgsel',
			cta: 'Vælg',
			highlight: true
		},
		{
			title: 'Hele dage',
			desc: 'Dagpasning med ture og ro – din hund er i trygge hænder.',
			price: 'Pris ved forespørgsel',
			cta: 'Vælg'
		}
	];

	const reasons = [
		{ icon: 'paw', title: 'Tryghed', text: 'Din hund får ro og omsorg under hele turen.' },
		{ icon: 'tree', title: 'Natur', text: 'Ture i skov og mark – godt for både næse og ben.' },
		{ icon: 'heart', title: 'Erfaring', text: 'Jeg elsker hunde og kender deres behov.' },
		{ icon: 'calendar', title: 'Fleksibel', text: 'Vi finder en tid der passer dig.' }
	];

	const steps = [
		{ num: 1, title: 'Book', text: 'Kontakt mig og fortæl om din hund og ønsket tid.' },
		{ num: 2, title: 'Aftal', text: 'Vi aftaler tid, sted og varighed.' },
		{ num: 3, title: 'Jeg henter', text: 'Jeg henter din hund og tager på tur.' },
		{ num: 4, title: 'Glad hjem', text: 'Din hund kommer træt og tilfreds hjem igen.' }
	];
</script>

<svelte:head>
	<title>Gjessø Hundelufter – Hundeluftning 30 min, time eller hele dage</title>
	<meta name="description" content="Professionel hundeluftning ved Gjessø. Halv time, time eller hele dage. Natur, trivsel og tryghed for din hund." />
</svelte:head>

<div class="page">
	<!-- Hero -->
	<section class="hero">
		<div class="hero-overlay"></div>
		<div class="hero-content animate-section">
			<h1 class="hero-title">Hundeluftning der giver ro i maven</h1>
			<p class="hero-subtitle">For dig og din hund – 30 min, time eller hele dage i trygge hænder</p>
			<a href="#pakker" class="hero-cta">Se priser og book</a>
		</div>
	</section>

	<!-- Om mig -->
	<section class="section section--alt">
		<div class="container animate-section">
			<h2 class="section-title">Om Gjessø Hundelufter</h2>
			<div class="about-grid">
				<div class="about-text">
					<p>
						Jeg tilbyder hundeluftning med fokus på trivsel og natur. Din hund får motion, frisk luft og
						opmærksomhed – mens du har ro i maven. Uanset om det er en kort tur på en halv time eller en
						hele dag med pasning, sørger jeg for, at din hund har det godt.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Pakker -->
	<section id="pakker" class="section">
		<div class="container animate-section">
			<h2 class="section-title">Vælg din pakke</h2>
			<div class="packages">
				{#each packages as pkg}
					<article class="package-card" class:package-card--highlight={pkg.highlight}>
						<h3 class="package-title">{pkg.title}</h3>
						<p class="package-desc">{pkg.desc}</p>
						<p class="package-price">{pkg.price}</p>
						<a href="#kontakt" class="package-cta">{pkg.cta}</a>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Hvorfor vælge mig -->
	<section class="section section--alt">
		<div class="container animate-section">
			<h2 class="section-title">Hvorfor vælge mig</h2>
			<div class="reasons">
				{#each reasons as r}
					<div class="reason-card">
						<div class="reason-icon">
							{#if r.icon === 'paw'}
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
							{:else if r.icon === 'tree'}
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
							{:else if r.icon === 'heart'}
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
							{:else}
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>
							{/if}
						</div>
						<h3 class="reason-title">{r.title}</h3>
						<p class="reason-text">{r.text}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Sådan fungerer det -->
	<section class="section">
		<div class="container animate-section">
			<h2 class="section-title">Sådan fungerer det</h2>
			<div class="steps">
				{#each steps as step}
					<div class="step">
						<span class="step-num">{step.num}</span>
						<div class="step-body">
							<h3 class="step-title">{step.title}</h3>
							<p class="step-text">{step.text}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Galleri -->
	<section class="section section--alt">
		<div class="container animate-section">
			<h2 class="section-title">Ture og natur</h2>
			<div class="gallery">
				<div class="gallery-item gallery-item--main" style="background-image: url('/images/gjesso-hero.jpg')"></div>
				<div class="gallery-item" style="background: linear-gradient(135deg, #86efac 0%, #4ade80 100%);"></div>
				<div class="gallery-item" style="background: linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%);"></div>
				<div class="gallery-item" style="background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);"></div>
			</div>
		</div>
	</section>

	<!-- Kontakt -->
	<section id="kontakt" class="section">
		<div class="container animate-section">
			<h2 class="section-title">Kontakt og booking</h2>
			<div class="contact-box">
				<p class="contact-intro">Skriv eller ring – så finder vi en tid der passer.</p>
				<div class="contact-details">
					<a href="mailto:kontakt@gjesso-hundelufter.dk" class="contact-link">kontakt@gjesso-hundelufter.dk</a>
					<a href="tel:+4512345678" class="contact-link">+45 12 34 56 78</a>
				</div>
				<p class="contact-note">Erstat med din rigtige e-mail og telefonnummer.</p>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="footer">
		<div class="container footer-inner">
			<p class="footer-brand">Gjessø Hundelufter</p>
			<p class="footer-tagline">Hundeluftning med kærlighed og natur</p>
			<p class="footer-copy">© {new Date().getFullYear()} Gjessø Hundelufter</p>
		</div>
	</footer>
</div>

<style>
	.page {
		overflow-x: hidden;
	}

	.animate-section {
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.6s ease-out, transform 0.6s ease-out;
	}
	.animate-section.visible {
		opacity: 1;
		transform: translateY(0);
	}
	.hero .animate-section {
		opacity: 1;
		transform: none;
	}
	/* Sektioner under hero skal altid være synlige */
	.section .animate-section {
		opacity: 1;
		transform: none;
	}

	/* Hero */
	.hero {
		position: relative;
		min-height: 85vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-image: url('/images/gjesso-hero.jpg');
		background-size: cover;
		background-position: center;
		background-color: #14532d;
	}
	.hero-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, rgba(20, 83, 45, 0.6) 0%, rgba(22, 101, 52, 0.75) 100%);
	}
	.hero-content {
		position: relative;
		z-index: 1;
		text-align: center;
		padding: 2rem 1.5rem;
		max-width: 36rem;
	}
	.hero-title {
		font-size: clamp(1.75rem, 5vw, 2.75rem);
		font-weight: 700;
		color: white;
		line-height: 1.2;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
	}
	.hero-subtitle {
		margin-top: 1rem;
		font-size: 1.125rem;
		color: rgba(255, 255, 255, 0.95);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	}
	.hero-cta {
		display: inline-block;
		margin-top: 1.75rem;
		padding: 0.875rem 1.75rem;
		background: white;
		color: #14532d;
		font-weight: 600;
		border-radius: 9999px;
		text-decoration: none;
		transition: transform 0.2s, box-shadow 0.2s;
	}
	.hero-cta:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
	}

	/* Sections */
	.section {
		padding: 4rem 1.5rem;
	}
	.section--alt {
		background: #f0fdf4;
	}
	.container {
		max-width: 72rem;
		margin: 0 auto;
	}
	.section-title {
		font-size: 1.875rem;
		font-weight: 700;
		color: #14532d;
		text-align: center;
		margin-bottom: 2.5rem;
	}

	/* About */
	.about-text {
		max-width: 42rem;
		margin: 0 auto;
	}
	.about-text p {
		font-size: 1.125rem;
		line-height: 1.75;
		color: #334155;
	}

	/* Packages */
	.packages {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 1.5rem;
	}
	.package-card {
		background: white;
		border-radius: 1rem;
		padding: 1.75rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
		border: 2px solid transparent;
		transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
	}
	.package-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
	}
	.package-card--highlight {
		border-color: #22c55e;
		background: linear-gradient(to bottom, #f0fdf4, white);
	}
	.package-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: #14532d;
		margin-bottom: 0.5rem;
	}
	.package-desc {
		font-size: 0.9375rem;
		color: #64748b;
		line-height: 1.6;
		margin-bottom: 1rem;
	}
	.package-price {
		font-weight: 600;
		color: #15803d;
		margin-bottom: 1rem;
	}
	.package-cta {
		display: inline-block;
		padding: 0.5rem 1.25rem;
		background: #22c55e;
		color: white;
		font-weight: 600;
		font-size: 0.875rem;
		border-radius: 9999px;
		text-decoration: none;
		transition: background 0.2s, transform 0.2s;
	}
	.package-cta:hover {
		background: #16a34a;
		transform: scale(1.02);
	}

	/* Reasons */
	.reasons {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.5rem;
	}
	.reason-card {
		text-align: center;
		padding: 1.5rem;
		background: white;
		border-radius: 1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
		transition: transform 0.25s, box-shadow 0.25s;
	}
	.reason-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.12);
	}
	.reason-icon {
		width: 3rem;
		height: 3rem;
		margin: 0 auto 1rem;
		color: #22c55e;
	}
	.reason-icon svg {
		width: 100%;
		height: 100%;
	}
	.reason-title {
		font-size: 1.125rem;
		font-weight: 700;
		color: #14532d;
		margin-bottom: 0.375rem;
	}
	.reason-text {
		font-size: 0.875rem;
		color: #64748b;
		line-height: 1.5;
	}

	/* Steps */
	.steps {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1.5rem;
	}
	.step {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}
	.step-num {
		flex-shrink: 0;
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #22c55e;
		color: white;
		font-weight: 700;
		border-radius: 50%;
		font-size: 1rem;
	}
	.step-title {
		font-size: 1.125rem;
		font-weight: 700;
		color: #14532d;
		margin-bottom: 0.25rem;
	}
	.step-text {
		font-size: 0.9375rem;
		color: #64748b;
		line-height: 1.5;
	}

	/* Gallery */
	.gallery {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 12rem);
		gap: 0.75rem;
		border-radius: 1rem;
		overflow: hidden;
	}
	.gallery-item {
		background-size: cover;
		background-position: center;
		min-height: 8rem;
	}
	.gallery-item--main {
		grid-column: 1;
		grid-row: 1 / -1;
		min-height: 100%;
	}
	@media (max-width: 640px) {
		.gallery {
			grid-template-columns: 1fr;
			grid-template-rows: 16rem 8rem 8rem 8rem;
		}
		.gallery-item--main {
			grid-column: 1;
			grid-row: 1;
		}
	}

	/* Contact */
	.contact-box {
		max-width: 32rem;
		margin: 0 auto;
		text-align: center;
		padding: 2rem;
		background: #f0fdf4;
		border-radius: 1rem;
		border: 2px solid #bbf7d0;
	}
	.contact-intro {
		font-size: 1.125rem;
		color: #334155;
		margin-bottom: 1rem;
	}
	.contact-details {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
		margin-bottom: 0.75rem;
	}
	.contact-link {
		font-weight: 600;
		color: #15803d;
		text-decoration: none;
		transition: color 0.2s;
	}
	.contact-link:hover {
		color: #14532d;
		text-decoration: underline;
	}
	.contact-note {
		font-size: 0.8125rem;
		color: #94a3b8;
	}

	/* Footer */
	.footer {
		background: #14532d;
		color: white;
		padding: 2.5rem 1.5rem;
		text-align: center;
	}
	.footer-inner {
		max-width: 72rem;
		margin: 0 auto;
	}
	.footer-brand {
		font-weight: 700;
		font-size: 1.25rem;
		margin-bottom: 0.25rem;
	}
	.footer-tagline {
		font-size: 0.9375rem;
		opacity: 0.9;
		margin-bottom: 1rem;
	}
	.footer-copy {
		font-size: 0.8125rem;
		opacity: 0.75;
	}
</style>
