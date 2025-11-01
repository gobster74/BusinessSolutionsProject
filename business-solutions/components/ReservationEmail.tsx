import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

interface ReservationEmailProps {
  reservationId: string;
  date: string;
  time: string;
  guests: number;
  restaurantAddress: string;
  phoneNumber: string;
  cancellationLink: string;
}

export function ReservationEmail({
  reservationId,
  date,
  time,
  guests,
  restaurantAddress,
  phoneNumber,
  cancellationLink
}: ReservationEmailProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-orange-500 text-white p-6 text-center">
        <h1 className="mb-2">🍔 Smash Burger Co.</h1>
        <h2>Your Bunbelievable Reservation is Confirmed!</h2>
        <Badge variant="secondary" className="mt-2 bg-white text-orange-500">
          Booking #{reservationId}
        </Badge>
      </div>

      {/* Confirmation Details */}
      <div className="p-6">
        <h3 className="mb-4 text-orange-600">Confirmation Details</h3>
        
        <div className="space-y-4">
          {/* Date & Time */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                📅
              </div>
              <div>
                <p className="text-gray-600">Date & Time</p>
                <p>{date} at {time}</p>
              </div>
            </div>
          </div>

          {/* Party Size */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                👥
              </div>
              <div>
                <p className="text-gray-600">Party Size</p>
                <p>{guests} {guests === 1 ? 'Guest' : 'Guests'}</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                📍
              </div>
              <div>
                <p className="text-gray-600">Location</p>
                <p>{restaurantAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Important Note */}
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm shrink-0 mt-0.5">
              ⚠️
            </div>
            <div>
              <h4 className="text-yellow-800 mb-1">Important Notice</h4>
              <p className="text-yellow-700">
                We can only hold your table for 10 minutes past your reservation time. 
                Please call us if you are running late!
              </p>
            </div>
          </div>
        </Card>

        <Separator className="my-6" />

        {/* Cancellation Policy */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="mb-2">Cancellation Policy</h4>
          <p className="text-gray-600">
            If your plans change, please{" "}
            <a 
              href={cancellationLink} 
              className="text-orange-600 underline hover:text-orange-700"
            >
              cancel or modify your reservation here
            </a>
            {" "}or call us at{" "}
            <a 
              href={`tel:${phoneNumber}`} 
              className="text-orange-600 underline hover:text-orange-700"
            >
              {phoneNumber}
            </a>.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-orange-500 text-white p-6 text-center">
        <h3>We can't wait to smash it with you! 🍔</h3>
        <p className="mt-2 text-orange-100">
          Thank you for choosing Smash Burger Co. See you soon!
        </p>
      </div>
    </div>
  );
}