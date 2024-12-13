import { json } from '@sveltejs/kit';

// Simulated email sending function
async function sendBookingConfirmation(formData) {
	// In a real application, this would use an email service like SendGrid, AWS SES, etc.
	console.log('Sending booking confirmation email to:', formData.email);
	return true;
}

// Simulated database save function
async function saveBookingRequest(formData) {
	// In a real application, this would save to a database
	console.log('Saving booking request:', formData);
	return true;
}

export async function POST({ request }) {
	try {
		const formData = await request.json();

		// Basic validation
		if (
			!formData.name ||
			!formData.email ||
			!formData.phone ||
			!formData.preferredDate ||
			!formData.preferredTime
		) {
			return json(
				{
					success: false,
					message: 'Alle påkrevde felt må fylles ut.'
				},
				{
					status: 400
				}
			);
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			return json(
				{
					success: false,
					message: 'Ugyldig e-postadresse.'
				},
				{
					status: 400
				}
			);
		}

		// Phone validation (Norwegian format)
		const phoneRegex = /^(\+47|0047)?[2-9]\d{7}$/;
		if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
			return json(
				{
					success: false,
					message: 'Ugyldig telefonnummer. Bruk norsk format.'
				},
				{
					status: 400
				}
			);
		}

		// Date validation
		const selectedDate = new Date(formData.preferredDate);
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (selectedDate < today) {
			return json(
				{
					success: false,
					message: 'Valgt dato kan ikke være i fortiden.'
				},
				{
					status: 400
				}
			);
		}

		// Save booking request
		await saveBookingRequest(formData);

		// Send confirmation email
		await sendBookingConfirmation(formData);

		// Return success response
		return json({
			success: true,
			message: 'Møteforespørsel mottatt. Vi kontakter deg innen 24 timer.'
		});
	} catch (error) {
		console.error('Booking request error:', error);

		return json(
			{
				success: false,
				message: 'Det oppstod en feil. Vennligst prøv igjen senere.'
			},
			{
				status: 500
			}
		);
	}
}
