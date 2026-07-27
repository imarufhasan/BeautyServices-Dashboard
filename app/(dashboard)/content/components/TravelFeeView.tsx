"use client";

import { useState } from "react";
import { Percent, Car, Save, Loader2 } from "lucide-react";
import { SaveButton } from "./SaveButton";

export function TravelFeeView() {
  const [commission, setCommission] = useState("15");
  const [travelFee, setTravelFee] = useState("2.00");

  const [savingCommission, setSavingCommission] = useState(false);
  const [savingTravelFee, setSavingTravelFee] = useState(false);

  const handleSaveCommission = async () => {
    setSavingCommission(true);

    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log({
        commission,
      });
    } finally {
      setSavingCommission(false);
    }
  };


  const handleSaveTravelFee = async () => {
    setSavingTravelFee(true);

    try {
      // API call here
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log({
        travelFee,
      });
    } finally {
      setSavingTravelFee(false);
    }
  };



  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl font-extrabold text-ink">
          Travel Fee & Commission
        </h2>

        <p className="text-sm text-subtle mt-1">
          Manage travel fee and platform commission settings.
        </p>
      </div>


      {/* Commission */}
      <div className="bg-white rounded-2xl border border-hairline shadow-soft overflow-hidden">

        <div className="p-6">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center">
              <Percent
                size={22}
                className="text-brand-pinkDeep"
              />
            </div>


            <div>
              <h3 className="font-bold text-ink">
                Platform Commission
              </h3>

              <p className="text-sm text-subtle">
                Percentage deducted from each booking.
              </p>
            </div>

          </div>


          <div className="mt-6 flex w-[360px]">

            <input
              type="number"
              value={commission}
              onChange={(e) =>
                setCommission(e.target.value)
              }
              className="
                flex-1
                rounded-l-xl
                border border-hairline
                px-4 py-3
                text-sm
                font-semibold
                outline-none
              "
            />

            <div
              className="
                flex items-center
                px-4
                border border-l-0 border-hairline
                rounded-r-xl
                text-subtle
                font-semibold
              "
            >
              %
            </div>

          </div>

        </div>


        <div className="border-t border-hairline px-6 py-4 flex justify-end">

          <SaveButton
            loading={savingCommission}
            onClick={handleSaveCommission}
          />

        </div>

      </div>



      {/* Travel Fee */}

      <div className="bg-white rounded-2xl border border-hairline shadow-soft overflow-hidden">

        <div className="p-6">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center">
              <Car
                size={22}
                className="text-brand-pinkDeep"
              />
            </div>


            <div>

              <h3 className="font-bold text-ink">
                Travel Fee (Per KM)
              </h3>

              <p className="text-sm text-subtle">
                Set travel fee amount per kilometer.
              </p>

            </div>

          </div>



          <div className="mt-6 flex w-[360px]">

            <div
              className="
                flex items-center
                px-4
                border border-r-0 border-hairline
                rounded-l-xl
                text-subtle
                font-semibold
              "
            >
              $
            </div>


            <input
              type="number"
              value={travelFee}
              onChange={(e) =>
                setTravelFee(e.target.value)
              }
              className="
                flex-1
                rounded-r-xl
                border border-hairline
                px-4 py-3
                text-sm
                font-semibold
                outline-none
              "
            />

          </div>

        </div>



        <div className="border-t border-hairline px-6 py-4 flex justify-end">

          <SaveButton
            loading={savingTravelFee}
            onClick={handleSaveTravelFee}
          />

        </div>

      </div>

    </div>
  );
}