import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
	private stripe: Stripe;

	constructor(private configService: ConfigService) {
		this.stripe = new Stripe(process.env.STRIPE_KEY!);
	}

	async createCheckoutSession(value: number, alottedTime: number, currency: string): Promise<Stripe.Checkout.Session> {
		try {
			const session = await this.stripe.checkout.sessions.create({
				line_items: [
					{
						price_data: {
							currency: currency,
							product_data: {
								name: 'Parking Time'
							},
							unit_amount: value * 100 //value is in cents originally
						},
						quantity: alottedTime
					}
				],
				mode: 'payment',
				success_url: 'http://localhost:3000/payment/success',
				cancel_url: 'http://localhost:3000/payment/cancel',
				/*metadata: {
					userId: userId
				}*/
			});
			return session;
		} catch(err) {
			console.error('Session error ', err);
			throw new InternalServerErrorException('Falha ao criar sessão de checkout!');
		}
	}
}
