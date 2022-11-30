using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class Result<T>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }

        public bool NotNull => Value != null;

        public Result(bool isSuccess, T value)
        {
            IsSuccess = isSuccess;
            Value = value;
        }

        public Result(string error)
        {
            IsSuccess = false;
            this.Error = error;
        }

        public static Result<T> Success(T value) => new Result<T>(true, value);
        public static Result<T> Failure(string error) => new Result<T>(error);
    }
}