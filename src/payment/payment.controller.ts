import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import Stripe from 'stripe';
import { Public } from 'src/decorators';

@Controller('payment')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Public()
	@Post('create-checkout-session')
	async createCheckoutSession(@Body() body: { value: number, alottedTime: number, currency: string}): Promise<Stripe.Checkout.Session> {
		const { value, alottedTime, currency } = body;

		return this.paymentService.createCheckoutSession(value, alottedTime, currency);
	}
}
