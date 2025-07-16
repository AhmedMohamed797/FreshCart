export function checkPasswordStrength(pasword) {
  let strength = 0;
  let feedback = { text: "", background: "", width: "" };

  if (pasword.length > 8) strength++;
  if (pasword.length > 12) strength++;
  if (/[A-Z]/.test(pasword)) strength++;
  if (/[a-z]/.test(pasword)) strength++;
  if (/[0-9]/.test(pasword)) strength++;
  if (/[!@#$%^&*()?]/.test(pasword)) strength++;

  switch (strength) {
    case 1:
      feedback.text = "Very Weak";
      feedback.background = "bg-red-500";
      feedback.width = "w-1/6";
      break;

    case 2:
      feedback.text = "Weak";
      feedback.background = "bg-orange-500";
      feedback.width = "w-2/6";
      break;

    case 3:
      feedback.text = "Fair";
      feedback.background = "bg-yellow-500";
      feedback.width = "w-3/6";
      break;

    case 4:
      feedback.text = "Good";
      feedback.background = "bg-lime-500";
      feedback.width = "w-4/6";
      break;

    case 5:
      feedback.text = "Strong";
      feedback.background = "bg-primary-400";
      feedback.width = "w-5/6";
      break;

    case 6:
      feedback.text = "Very Strong";
      feedback.background = "bg-primary-600";
      feedback.width = "w-full";
      break;
  }

  return feedback;
}
