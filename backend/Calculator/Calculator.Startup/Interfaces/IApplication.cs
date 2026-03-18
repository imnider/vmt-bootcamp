
namespace Calculator.Startup.Interfaces
{
    internal interface IApplication
    {
        void Start();
        void ShowMessage(string message, ConsoleColor color = ConsoleColor.White);
        string ShowQuestion(string question, ConsoleColor color = ConsoleColor.White);
        void ShowMenu();
        double Sum(double number1, double number2);
        double Subtract(double number1, double number2);
        double Multiply (double number1, double number2);
        double Divide(double number1, double number2);
    }
}
