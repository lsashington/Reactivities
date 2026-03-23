using System;
using FluentValidation;
using MediatR;

namespace Application.Core;

public class ValidationBehavior<TRequest, TResponse>(IValidator<TRequest>? validator = null)
    : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (validator == null) return await next();
        
        var validationResutl = await validator.ValidateAsync(request, cancellationToken);

        if (!validationResutl.IsValid)
        {
            throw new ValidationException(validationResutl.Errors);
        }

        return await next();
    }
}

