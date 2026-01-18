import { motion } from "framer-motion";
import DatePicker from "react-date-picker";
import { FiMinus, FiPlus } from "react-icons/fi";

export const OrderInputs = ({ formData, t, currentLanguage, actions }) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Quantity */}
      <div className="space-y-3">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700"
        >
          {t("orderForm.quantity")}
        </label>
        <div className="flex items-center">
          <motion.button
            type="button"
            onClick={() => actions.adjustQuantity(-1)}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-gray-100 rounded-l-lg hover:bg-gray-200 transition-colors"
          >
            <FiMinus className="text-gray-600" />
          </motion.button>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={actions.handleChange}
            className="w-full px-4 py-2 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <motion.button
            type="button"
            onClick={() => actions.adjustQuantity(1)}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-gray-100 rounded-r-lg hover:bg-gray-200 transition-colors"
          >
            <FiPlus className="text-gray-600" />
          </motion.button>
        </div>
      </div>

      {/* Date Picker */}
      <div className="space-y-3">
        <label
          htmlFor="pickup_date"
          className="block text-sm font-medium text-gray-700"
        >
          {t("orderForm.pickupDate")}
        </label>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="react-date-picker__wrapper"
        >
          <DatePicker
            onChange={actions.handleDateChange}
            value={formData.pickup_date}
            minDate={new Date()}
            className="w-full border border-gray-300 rounded-xl"
            calendarClassName="border border-gray-300 rounded-xl shadow-lg"
            clearIcon={null}
            required
            format={currentLanguage === "ar" ? "dd/MM/y" : "MM/dd/y"}
          />
        </motion.div>
      </div>
    </div>

    {/* Instructions */}
    <div className="space-y-3">
      <label
        htmlFor="special_instructions"
        className="block text-sm font-medium text-gray-700"
      >
        {t("orderForm.specialInstructions")}
      </label>
      <motion.div whileHover={{ scale: 1.01 }}>
        <textarea
          id="special_instructions"
          name="special_instructions"
          value={formData.special_instructions}
          onChange={actions.handleChange}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder={t("orderForm.specialInstructionsPlaceholder")}
        />
      </motion.div>
    </div>
  </>
);
