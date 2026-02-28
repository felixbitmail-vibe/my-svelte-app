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

	const prices = [
		{ label: '30 min luftning', amount: '30 kr' },
		{ label: '1 time luftning', amount: '60 kr' },
		{ label: 'Dags pasning', amount: '100 kr' }
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
	<div class="page-bg" aria-hidden="true"></div>
	<!-- Hero -->
	<section class="hero">
		<div class="hero-overlay"></div>
		<div class="hero-content animate-section">
			<h1 class="hero-title">Tryg hundeluftning i Gjessø.</h1>
			<p class="hero-subtitle">For dig og din hund – 30 min, time eller hele dage i trygge hænder</p>
			<a href="#priser" class="hero-cta">Se priser og book</a>
		</div>
	</section>

	<!-- Om mig -->
	<section class="section section--bg">
		<div class="container animate-section">
			<h2 class="section-title">Om Gjessø Hundelufter</h2>
			<div class="about-grid">
				<div class="about-text">
					<p>
						Jeg tilbyder hundeluftning med fokus på trivsel og natur. Din hund får motion, frisk luft og
						opmærksomhed. Uanset om det er en kort tur på en halv time eller en
						hele dag med pasning, sørger jeg for, at din hund har det godt.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Priser -->
	<section id="priser" class="section section--white">
		<div class="container animate-section">
			<h2 class="section-title">Priser</h2>
			<div class="price-list">
				{#each prices as p}
					<div class="price-row">
						<span class="price-label">{p.label}</span>
						<span class="price-amount">{p.amount}</span>
					</div>
				{/each}
			</div>
			<p class="price-note">Kontakt mig for booking – se <a href="#kontakt">kontakt</a> nedenfor.</p>
		</div>
	</section>

	<!-- Hvorfor vælge mig -->
	<section class="section section--bg">
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
	<section class="section section--white">
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

	<!-- Galleri: natur og glade hunde -->
	<section class="section section--bg">
		<div class="container animate-section">
			<h2 class="section-title">Ture og natur</h2>
			<p class="gallery-intro">Luftning i skov og mark – her er et indblik i turene.</p>
			<div class="gallery">
				<div class="gallery-item gallery-item--main" style="background-image: url('/images/dog-walk-nature.png')"></div>
				<div class="gallery-item gallery-item--contain gallery-item--tall" style="background-image: url('/images/winter-dog-walk.png')"></div>
			</div>
			<p class="gallery-hint">Du kan tilføje flere billeder i mappen <code>static/images/</code>.</p>
		</div>
	</section>

	<!-- Kontakt -->
	<section id="kontakt" class="section section--white">
		<div class="container animate-section">
			<h2 class="section-title">Kontakt og booking</h2>
			<div class="contact-box">
				<p class="contact-intro">Skriv eller ring – så finder vi en tid der passer.</p>
				<div class="contact-details">
					<a href="mailto:kontakt@gjesso-hundelufter.dk" class="contact-link">kontakt@gjesso-hundelufter.dk</a>
					<a href="tel:+4529854561" class="contact-link">29 85 45 61</a>
				</div>
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
		position: relative;
		overflow-x: hidden;
	}
	.page-bg {
		position: fixed;
		inset: 0;
		z-index: 0;
		background-image: url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80');
		background-size: cover;
		background-position: center;
		background-color: #14532d;
	}
	.page > .hero,
	.page > .section,
	.page > footer {
		position: relative;
		z-index: 1;
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
		min-height: 70vh;
		display: flex;
		align-items: center;
		justify-content: center;
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
		padding: 1.5rem 1.25rem;
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
		padding: 2.25rem 1.25rem;
	}
	.section--white {
		background: rgba(255, 255, 255, 0.97);
	}
	.section--bg {
		position: relative;
	}
	.section--bg::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, rgba(20, 83, 45, 0.72) 0%, rgba(22, 101, 52, 0.8) 100%);
		pointer-events: none;
	}
	.section--bg .container {
		position: relative;
		z-index: 1;
	}
	.section--bg .section-title {
		color: white;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	}
	.section--bg .about-text p,
	.section--bg .reason-card,
	.section--bg .reason-title,
	.section--bg .reason-text,
	.section--bg .gallery-intro,
	.section--bg .gallery-hint {
		color: inherit;
	}
	.section--bg .reason-card {
		background: rgba(255, 255, 255, 0.95);
	}
	.section--bg .reason-title { color: #14532d; }
	.section--bg .reason-text { color: #475569; }
	.section--bg .gallery-intro { color: rgba(255, 255, 255, 0.95); }
	.section--bg .gallery-hint { color: rgba(255, 255, 255, 0.8); }
	.section--bg .gallery-hint code { background: rgba(0, 0, 0, 0.2); color: white; }
	.section--bg .about-text p { color: rgba(255, 255, 255, 0.95); }
	.container {
		max-width: 72rem;
		margin: 0 auto;
	}
	.section-title {
		font-size: 1.625rem;
		font-weight: 700;
		color: #14532d;
		text-align: center;
		margin-bottom: 1.5rem;
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

	/* Priser */
	.price-list {
		max-width: 24rem;
		margin: 0 auto 1rem;
		background: white;
		border-radius: 1rem;
		padding: 1.5rem 2rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
	}
	.price-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 0;
		border-bottom: 1px solid #e2e8f0;
	}
	.price-row:last-child {
		border-bottom: none;
	}
	.price-label {
		font-size: 1.0625rem;
		color: #334155;
	}
	.price-amount {
		font-weight: 700;
		color: #15803d;
		font-size: 1.125rem;
	}
	.price-note {
		text-align: center;
		font-size: 0.9375rem;
		color: #64748b;
	}
	.price-note a {
		color: #15803d;
		font-weight: 600;
		text-decoration: none;
	}
	.price-note a:hover {
		text-decoration: underline;
	}

	/* Reasons */
	.reasons {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1rem;
	}
	.reason-card {
		text-align: center;
		padding: 1.25rem;
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
		gap: 1rem;
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
	.gallery-intro {
		text-align: center;
		color: #64748b;
		margin-bottom: 0.75rem;
		max-width: 36rem;
		margin-left: auto;
		margin-right: auto;
	}
	.gallery {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		grid-template-rows: repeat(3, 9rem);
		gap: 0.75rem;
		border-radius: 1rem;
		overflow: hidden;
	}
	.gallery-item {
		background-size: cover;
		background-position: center;
		background-color: #e2e8f0;
		min-height: 6rem;
	}
	.gallery-item--contain {
		background-size: contain;
		background-repeat: no-repeat;
		background-color: transparent;
	}
	.gallery-item--tall {
		grid-row: span 2;
		min-height: 18rem;
	}
	.gallery-item--main {
		grid-column: 1;
		grid-row: 1 / -1;
		min-height: 100%;
	}
	.gallery-hint {
		text-align: center;
		font-size: 0.8125rem;
		color: #94a3b8;
		margin-top: 1rem;
	}
	.gallery-hint code {
		background: #e2e8f0;
		padding: 0.15rem 0.4rem;
		border-radius: 0.25rem;
	}
	@media (max-width: 640px) {
		.gallery {
			grid-template-columns: 1fr;
			grid-template-rows: 14rem 10rem;
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
		padding: 1.5rem;
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
		padding: 1.75rem 1.5rem;
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
