using Calculator.Startup.Models;
using Calculator.Startup.Interfaces;
using System.Reflection.Metadata.Ecma335;

namespace Calculator.Startup.Classes
{
    internal class Application : IApplication
    {
        private List<Option> _options = [];
        private void InitOptions()
        {
            _options.Add(new Option()
            {
                Id = 1,
                DisplayName = "Sumar dos números",
                Usage = "<numero> <numero>",
                Return = "Resultado: <numero>"
            });
            _options.Add(new Option()
            {
                Id = 1,
                DisplayName = "Restar dos números",
                Usage = "<numero> <numero>",
                Return = "Resultado: <numero>"
            });
            _options.Add(new Option()
            {
                Id = 1,
                DisplayName = "Multiplicar dos números",
                Usage = "<numero> <numero>",
                Return = "Resultado: <numero>"
            });
            _options.Add(new Option()
            {
                Id = 1,
                DisplayName = "Dividir dos números",
                Usage = "<numero> <numero>",
                Return = "Resultado: <numero>"
            });
        }
        public void ShowMessage(string message, ConsoleColor color = ConsoleColor.White)
        {
            Console.ForegroundColor = color;
            Console.WriteLine(message);
            Console.ResetColor();

        }
        public string ShowQuestion(string question, ConsoleColor color = ConsoleColor.White)
        {
            ShowMessage(question, color);
            return Console.ReadLine();
        }
        public void ShowMenu()
        {
            var message = $"""
                ---------------------------------

                CALCULADORA

                ---------------------------------

                Opciones:
                {string.Join("\n", _options.Select((cmd) => $"{cmd.Id}. {cmd.DisplayName}\n{cmd.Usage}\n{cmd.Return}"))}

                ---------------------------------
                """;
            Console.WriteLine(message);
        }
        public double Sum(double number1, double number2)
        {
            return number1 + number2;
        }
        public double Subtract(double number1, double number2)
        {
            return number1 - number2;
        }
        public double Multiply(double number1, double number2)
        {
            return number1 * number2;
        }
        public double Divide(double number1, double number2)
        {
            return number1 / number2;
        }
        public void Start()
        {
            InitOptions();
            while (true)
            {
                ShowMenu();
                try
                {
                    var optionID = Convert.ToInt32(ShowQuestion("Seleccione una opción: ", ConsoleColor.Blue));
                    var number1 = Convert.ToDouble(ShowQuestion("Numero 1: ", ConsoleColor.Yellow));
                    var number2 = Convert.ToDouble(ShowQuestion("Numero 2: ", ConsoleColor.Yellow));
                }
                catch (Exception)
                {

                    throw;
                }
            }
        }
    }
}
